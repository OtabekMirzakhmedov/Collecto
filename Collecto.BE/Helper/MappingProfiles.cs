using AutoMapper;
using Collecto.BE.DTO;
using Collecto.BE.Helper.Resolvers;
using Collecto.BE.Models;

namespace Collecto.BE.Helper
{
    public class MappingProfiles : Profile
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
                .ForMember(dest => dest.TopicName, opt => opt.MapFrom(src => src.Topic.TopicName))
                .ForMember(dest => dest.CollectionId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.NumberOfItems, opt => opt.MapFrom(src => src.Items.Count))
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.User.FullName))
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items))
                .ForMember(dest => dest.NumberOfLikes, opt => opt.MapFrom(src => src.Items.Select(i => i.Likes.Count).Sum()));

            CreateMap<CustomFieldDto, CustomField>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CustomFieldId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FieldName))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.FieldType))
                .ReverseMap();

            CreateMap<TopicDto, Topic>().ReverseMap();

            CreateMap<CustomFieldValue, CustomFieldValueDto>()
                .ForMember(dest => dest.CustomFieldId, opt => opt.MapFrom(src => src.CustomFieldId))
                .ForMember(dest => dest.FieldName, opt => opt.MapFrom(src => src.CustomField.Name))
                .ForMember(dest => dest.FieldType, opt => opt.MapFrom(src => src.CustomField.Type))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.ItemId, opt => opt.MapFrom(src => src.ItemId));

            CreateMap<CustomFieldValueDto, CustomFieldValue>()
                .ForMember(dest => dest.CustomFieldId, opt => opt.MapFrom(src => src.CustomFieldId))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.ItemId, opt => opt.MapFrom(src => src.ItemId));


            CreateMap<ItemDto, Item>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.CustomFieldValues, opt => opt.Ignore())
                .ForMember(dest => dest.ItemTags, opt => opt.Ignore());

            CreateMap<Item, ItemDto>()
                .ForMember(dest => dest.ItemTags, opt => opt.MapFrom(src => src.ItemTags.Select(it => it.Tag.TagName)))
                .ForMember(dest => dest.NumberOfLikes, opt => opt.MapFrom(src => src.Likes.Count))
                .ForMember(dest => dest.CustomFieldValues, opt => opt.MapFrom(src => src.CustomFieldValues))
                .ForMember(dest => dest.LikedUsers, opt => opt.MapFrom(src => src.Likes.Select(l => l.User.Id).ToList()))
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Collection.User.FullName))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Collection.User.Id))
                .ForMember(dest => dest.CollectionName, opt => opt.MapFrom(src => src.Collection.Title))
                .ForMember(dest => dest.CollectionId, opt => opt.MapFrom(src => src.Collection.Id));

            CreateMap<Comment, CommentDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
                .ForMember(dest => dest.ItemId, opt => opt.MapFrom(src => src.Item.Id))
                .ForMember(dest => dest.CommentId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName));
        }
    }
}
