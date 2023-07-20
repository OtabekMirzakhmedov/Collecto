using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Collecto.BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;


        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("user")]
        public async Task<ActionResult<UserDataDto>> GetUserData()
        {
            _logger.LogInformation("User data getting is executing ....");
            try
            {
                // Retrieve the user ID from the authenticated user principal
                string? userId = User.FindFirst("Id")?.Value;
                _logger.LogInformation(userId);


                var user = await _userService.GetUserData(userId);

                // Check if user data exists
                if (user == null)
                {
                    return NotFound("User data not found");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpGet("all-users")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsers());
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPut("block-users")]
        public async Task<IActionResult> BlockUsers([FromBody] string[] userIds)
        {
            try
            {
                var blockedUsers = await _userService.BlockUsers(userIds);
                return Ok(blockedUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPut("unblock-users")]
        public async Task<IActionResult> UnblockUsers([FromBody] string[] userIds)
        {
            try
            {
                var unblockedUsers = await _userService.UnblockUsers(userIds);
                return Ok(unblockedUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPut("make-admin")]
        public async Task<IActionResult> MakeAdmin([FromBody] string[] userIds)
        {
            try
            {
                var admins = await _userService.MakeAdmin(userIds);
                return Ok(admins);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPut("make-user")]
        public async Task<IActionResult> MakeUser([FromBody] string[] userIds)
        {
            try
            {
                var users = await _userService.MakeUser(userIds);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
