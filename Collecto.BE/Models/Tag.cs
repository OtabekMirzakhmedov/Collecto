﻿namespace Collecto.BE.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string? TagName { get; set; }
        public ICollection<ItemTag>? ItemTags { get; set; }
    }
}
