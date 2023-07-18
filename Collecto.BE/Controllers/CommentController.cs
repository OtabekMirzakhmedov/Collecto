using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PusherServer;

namespace Collecto.BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly Pusher _pusher;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
            var options = new PusherOptions
            {
                Cluster = "ap3",
            };
            _pusher = new Pusher("1636689", "c6ee54717f876c338b30", "bbe24fe112fd51746581", options);
        }

        [HttpGet("get-comments/{id}")]
        public async Task<IActionResult> GetCommentsByItemId(int id) => Ok(await _commentService.GetCommentsByItemId(id));

        [HttpPost("create-comment")]
        public async Task<IActionResult> CreateComment([FromBody] CommentDto commentDto)
        {
            var comment = await _commentService.CreateComment(commentDto);

            await _pusher.TriggerAsync($"item-comments-{comment.ItemId}", "new-comment", comment);

            return Ok(comment);
        }

    }
}
