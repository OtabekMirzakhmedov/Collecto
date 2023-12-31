﻿using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Services
{
    public class TagService : ITagService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public TagService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public async Task<IList<string>> GetAllTagNames()
        {
            var tagNames = await _dataContext.Tags
                .Select(tag => tag.TagName)
                .ToListAsync();

            return tagNames;
        }

        public async Task<IList<Tag>> GetAllTags()
        {
            var tags = await _dataContext.Tags.ToListAsync();

            return tags;
        }
    }
}
