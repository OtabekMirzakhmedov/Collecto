using AutoMapper;
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
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now.Date));

            CreateMap<CustomFieldDto, CustomField>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FieldName))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.FieldType));

            CreateMap<TopicDto, Topic>();
        }
    }
}
