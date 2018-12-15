using System;
namespace my8Blog.Admin.Models
{

    public class Article
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Preview { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public bool IsDelete { get; set; }
        public int Likes { get; set; }
        public int Comments { get; set; }
        public int Shares { get; set; }
        public int Views { get; set; }
        public Category Category { get; set; }
        public string[] CategoryIds { get; set; }
        public string[] CategoryNames { get; set; }
        public Author Author { get; set; }
        public int ProjectId { get; set; }
    }
}