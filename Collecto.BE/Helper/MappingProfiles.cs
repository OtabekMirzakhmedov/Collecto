﻿using AutoMapper;
using Collecto.BE.DTO;
using Collecto.BE.Helper.Resolvers;
using Collecto.BE.Models;

namespace Collecto.BE.Helper
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now.Date));

            CreateMap<CollectionDto, Collection>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Topic, opt => opt.MapFrom<TopicResolver>())
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.CustomFields, opt => opt.MapFrom(src => src.CustomFields))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

            CreateMap<Collection, CollectionDto>()
            .ForMember(dest => dest.TopicName, opt => opt.MapFrom(src => src.Topic.TopicName));

            CreateMap<CustomFieldDto, CustomField>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CustomFieldId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FieldName))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.FieldType))
                .ReverseMap();

            CreateMap<TopicDto, Topic>().ReverseMap();

            CreateMap<CustomFieldValue, CustomFieldValueDto>();

            CreateMap<ItemDto, Item>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.CustomFieldValues, opt => opt.Ignore())
                .ForMember(dest => dest.ItemTags, opt => opt.Ignore());

            CreateMap<Item, ItemDto>()
                .ForMember(dest => dest.ItemTags, opt => opt.MapFrom(src => src.ItemTags.Select(it => it.Tag.TagName)))
                .ForMember(dest => dest.NumberOfLikes, opt => opt.MapFrom(src => src.Likes.Count))
                .ForMember(dest => dest.CustomFieldValues, opt => opt.MapFrom(src => src.CustomFieldValues));
        }
    }
}
