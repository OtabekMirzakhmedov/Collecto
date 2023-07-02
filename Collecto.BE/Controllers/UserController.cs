﻿using Collecto.BE.DTO;
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
                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Use the user ID to fetch the user data
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


    }
}
