﻿using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Collecto.BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly ICollectionService _collectionService;

        public CollectionController(ICollectionService collectionService)
        {
            _collectionService = collectionService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-collection")]
        public async Task<IActionResult> CreateCollection([FromBody] CollectionDto collectionDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst("Id")?.Value;
            int collectionID = await _collectionService.CreateCollection(userId, collectionDto);
            return Ok(collectionID);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCollectionById(int id)
        {
            var collection = await _collectionService.GetCollectionById(id);
            if (collection == null)
            {
                return NotFound();
            }
            return Ok(collection);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollectionById(int id)
        {
            await _collectionService.DeleteCollectionById(id);
            return Ok("Deleted");
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCollection(int id, [FromBody] CollectionDto updatedCollectionDto)
        {
          
            try
            {
                await _collectionService.EditCollection(id, updatedCollectionDto);
                return Ok("Updated");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
