using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my8Blog.Admin.Infrastructures;
using my8Blog.Admin.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace my8Blog.Admin.Infrastructures
{
    public static class CoreApiClient
    {

        public static async Task<IActionResult> Get(this HttpClient httpClient, ClientConfig clientConfig, 
           string path = "/", object param = null, CurrentProcess process=null)
        {
            return await httpClient.Call(clientConfig, HttpMethod.Get, path, param,null,process);
        }

        public static async Task<IActionResult> Delete(this HttpClient httpClient, ClientConfig clientConfig, 
             string path = "/", object data = null, CurrentProcess process=null)
        {
            return await httpClient.Call(clientConfig, HttpMethod.Delete, path, null, data,process);
        }

        public static async Task<IActionResult> Post(this HttpClient httpClient, ClientConfig clientConfig, 
             string path = "/", object param = null, object data = null, CurrentProcess process=null)
        {
            return await httpClient.Call(clientConfig, HttpMethod.Post, path, param, data,process);
        }

        public static async Task<IActionResult> Put(this HttpClient httpClient, ClientConfig clientConfig, 
             string path = "/", object param = null, object data = null, CurrentProcess process=null)
        {
            return await httpClient.Call(clientConfig, HttpMethod.Put, path, param, data, process);
        }
        public static async Task<HttpClientResult<T>> SendRequestAsync<T>(
            this HttpClient httpClient, ClientConfig clientConfig,
            HttpMethod httpMethod, string path = "/", object param = null, object data = null, CurrentProcess process = null)
        {
            var response = await httpClient.CallGetResponse(clientConfig, httpMethod, path, param, data, process);

            if (response != null)
            {
                var result = JsonConvert.DeserializeObject<T>(response.Item2);

                if (result is ResponseJsonModel)
                {
                    var obj = result as ResponseJsonModel;

                    if (obj?.error?.code != null)
                        obj.error.message = "Lỗi";
                }

                return HttpClientResult<T>.Create(response.Item1, result, response.Item3, response.Item4);
            }
            else
                return HttpClientResult<T>.Create(response.Item1, TypeExtensions.GetDefaultValue<T>(), null, false);
        }
        private static async Task<IActionResult> Call(this HttpClient httpClient, ClientConfig clientConfig, 
            HttpMethod method, string path = "/", object param = null, object data = null,CurrentProcess process = null)
        {
            var requestMessage = processRequestMessage(clientConfig, method, path, param, data, process);
            var response = await httpClient.SendAsync(requestMessage).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            
            return new HttpContentActionResult(response.Content);
        }

       
        private static async Task<Tuple<HttpStatusCode, string, string, bool>> CallGetResponse(this HttpClient httpClient, ClientConfig clientConfig,
            HttpMethod method, string path = "/", object param = null, object data = null, CurrentProcess process = null)
        {
            var requestMessage = processRequestMessage(clientConfig, method, path, param, data, process);
            using (var response = await httpClient.SendAsync(requestMessage))
            {
                if (response.Content != null)
                {
                    var responseData = response.StatusCode == HttpStatusCode.Moved || response.StatusCode == HttpStatusCode.Found
                        ? response.Headers.Location.AbsoluteUri
                        : await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                    return new Tuple<HttpStatusCode, string, string, bool>(
                        response.StatusCode,
                        responseData,
                        response.Headers?.ETag?.Tag,
                        response.StatusCode == HttpStatusCode.NotModified);
                }
                else
                    throw new Exception($"error {response.StatusCode}");
            }
        }
        private static HttpRequestMessage processRequestMessage(ClientConfig clientConfig, HttpMethod method, 
            string path = "/", object param = null, object data = null, CurrentProcess process = null)
        {
            if (param != null)
                path = path.AddQuery(param);
            var url = $"{clientConfig.ServiceUrl}{path}";
            var requestMessage = new HttpRequestMessage(method, url);
            string json = null;

            HttpContent content = null;

            if (data != null)
                if (data is string)
                    content = new StringContent((string)data, Encoding.UTF8, "application/json");
                else if (data is IDictionary<string, object>)
                {
                    var formData = new MultipartFormDataContent();

                    foreach (var pair in data as IDictionary<string, object>)
                        if (pair.Value is byte[])
                            formData.Add(new ByteArrayContent(pair.Value as byte[]), pair.Key, pair.Key);
                        else
                            formData.Add(new StringContent(pair.Value.ToString()), pair.Key);

                    content = formData;
                }
                else if (data is List<Tuple<string, object>>)
                {
                    var formData = new MultipartFormDataContent();

                    foreach (var pair in data as List<Tuple<string, object>>)
                        if (pair.Item2 is byte[])
                            formData.Add(new ByteArrayContent(pair.Item2 as byte[]), pair.Item1, pair.Item1);
                        else if (pair.Item2 != null)
                            formData.Add(new StringContent(pair.Item2.ToString()), pair.Item1);

                    content = formData;
                }
                else
                {
                    json = JsonConvert.SerializeObject(data, new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore
                    });

                    content = new StringContent(json, Encoding.UTF8, "application/json");
                }
            var signature = string.Empty;
            var originalData = string.Empty;
            if (method == HttpMethod.Get)
            {
                var list = new List<string>();

                if (url.Contains("?"))
                    foreach (var q in url.Split('?')[1].Split('&'))
                        if (q.Contains("="))
                            list.Add(q.Split('=')[1]);

                originalData = string.Join(string.Empty, list);
            }
            else if (data != null)
                originalData = json;

            if (string.IsNullOrWhiteSpace(originalData))
                originalData = string.Empty;
            signature = Utils.HmacSha256(clientConfig.ApiKey + originalData, clientConfig.SecretKey);
            string personId = process != null ? process.CurrentAccount?.Account?.PersonId : string.Empty;
            if (personId == null)
                personId = "guest";

            requestMessage.Headers.Add("X-my8-Key", clientConfig.ApiKey);
            requestMessage.Headers.Add("X-my8-Signature", signature);
            requestMessage.Headers.Add("X-my8-PersonId", personId);
            requestMessage.Headers.Add("X-my8-ProjectId", process.CurrentAccount.Account.ProjectId.ToString());
            requestMessage.Content = content;
            return requestMessage;
        }
    }
    public class HttpContentActionResult : IActionResult
    {
        private readonly HttpContent content;
        public HttpContentActionResult(HttpContent content)
        {
            this.content = content;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            using (var stream = await content.ReadAsStreamAsync())
            {
                context.HttpContext.Response.ContentType = content.Headers.ContentType.ToString();

                await stream.CopyToAsync(context.HttpContext.Response.Body);
            }
        }
    }
}
public class HttpClientResult<T>
{
    public static HttpClientResult<T> Create(HttpStatusCode statusCode, T data, string eTag, bool isCache)
    {
        return new HttpClientResult<T>()
        {
            StatusCode = statusCode,
            Data = data,
            ETag = eTag,
            IsCache = isCache
        };
    }

    public HttpStatusCode StatusCode { get; set; }
    public T Data { get; set; }
    public string ETag { get; set; }
    public bool IsCache { get; set; }
}
public static class TypeExtensions
{
    public static T GetDefaultValue<T>()
    {
        return (T)GetDefaultValue(typeof(T));
    }

    public static object GetDefaultValue(this Type type)
    {
        return type.GetTypeInfo().IsValueType ? Activator.CreateInstance(type) : null;
    }
}