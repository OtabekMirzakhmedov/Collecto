using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Collecto.BE.Models
{
    public class User : IdentityUser
    {
        [NotMapped]
        public override string UserName { get; set; }
        public string? FullName { get; set; }

        public DateTime CreatedAt { get; set; }

        public int RoleId { get; set; }

        public Role? Role { get; set; }

        public ICollection<Item>? Items { get; set; }

        public ICollection<Collection>? Collections { get; set; }

        public ICollection<Comment>? Comments { get; set; }

        public ICollection<Like>? Likes { get; set; }

       


    }
}
