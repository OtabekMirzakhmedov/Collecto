﻿using System.ComponentModel.DataAnnotations;

namespace Collecto.BE.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public ICollection<ItemTag> ItemTags { get; set; }

        public User User { get; set; }

        public Collection? Collection { get; set; }

        public ICollection<Comment>? Comments { get; set; }

        public ICollection<Like>? Likes { get; set; }
    }
}
