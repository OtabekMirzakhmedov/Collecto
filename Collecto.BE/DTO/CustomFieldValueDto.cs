﻿namespace Collecto.BE.DTO
{
    public class CustomFieldValueDto
    {
        public int Id { get; set; }
        public int CustomFieldId { get; set; }
        public int ItemId { get; set; }
        public string? Value { get; set; }
    }
}
