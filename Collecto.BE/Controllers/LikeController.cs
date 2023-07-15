using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Collecto.BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly ILikeService _likeService;

        public LikeController(ILikeService likeService)
        {
            _likeService = likeService;
        }

        [HttpPost("like")]
        public async Task<IActionResult> CreateLike([FromBody] LikeDto likeDto)
        {
            int LikeId = await _likeService.CreateLike(likeDto);
            return Ok(LikeId);
        }

        [HttpDelete("like")]
        public async Task<IActionResult> DeleteLike([FromBody] LikeDto likeDto)
        {
            await _likeService.DeleteLike(likeDto);
            return Ok("Deleted");
        }
    }
}
