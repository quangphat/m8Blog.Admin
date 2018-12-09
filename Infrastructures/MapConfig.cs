using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using my8Blog.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Blog.Admin.Infrastructures
{
    public class MapConfig
    {
        public static void Config(IServiceCollection services)
        {
            Mapper.Initialize(mapper =>
            {
                ConfigMapper(mapper);
            });
        }
        public static void ConfigMapper(IMapperConfigurationExpression mapper)
        {
            mapper.AllowNullCollections = true;
            mapper.CreateMap<Account, Author>()
               .ForMember(a => a.Id, b => b.MapFrom(c => c.PersonId))
               .ForMember(a => a.FirstName, b => b.MapFrom(c => c.Firstname))
               .ForMember(a => a.LastName, b => b.MapFrom(c => c.Lastname))
               .ForMember(a => a.Email, b => b.MapFrom(c => c.Email))
               .ForMember(a => a.Avatar, b => b.MapFrom(c => c.Avatar));
            mapper.CreateMap<Author, Account>()
                .ForMember(a => a.PersonId, b => b.MapFrom(c => c.Id))
                .ForMember(a => a.Firstname, b => b.MapFrom(c => c.FirstName))
                .ForMember(a => a.Lastname, b => b.MapFrom(c => c.LastName))
                .ForMember(a => a.Email, b => b.MapFrom(c => c.Email))
                .ForMember(a => a.Avatar, b => b.MapFrom(c => c.Avatar));
            //<AppendNewHere>
        }
    }
}
