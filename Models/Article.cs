using System;
namespace my8Blog.Admin.Models
{

    public class Article
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Preview { get; set; }
        public long CreatedTime { get; set; }
        public long ModifiedTime { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
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
        public string ProjectId { get; set; }
        public string FriendlyUrl { get; set; }
        public int Status { get; set; }
    }
}