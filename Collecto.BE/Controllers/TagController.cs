using Collecto.BE.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Collecto.BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;

        }

        [HttpGet("tags")]
        public async Task<IActionResult> GetAllTags() => Ok(await _tagService.GetAllTags());

        [HttpGet("tagNames")]
        public async Task<IActionResult> GetAllTagNames() => Ok(await _tagService.GetAllTagNames());
    }
}
