using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Collecto.BE.Models
{
    public class User : IdentityUser
    {
        public string? FullName { get; set; }

        public DateTime CreatedAt { get; set; }

        public ICollection<Collection>? Collections { get; set; }

        public ICollection<Comment>? Comments { get; set; }

        public ICollection<Like>? Likes { get; set; }

        [Required]
        public bool IsActive { get; set; }




    }
}
