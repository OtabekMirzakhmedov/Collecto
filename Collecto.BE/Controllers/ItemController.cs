using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Collecto.BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-item")]
        public async Task<IActionResult> CreateItem(int collectionId,[FromBody] ItemDto itemDto)
        {
            var item = await _itemService.CreateItem(collectionId, itemDto);
            return Ok(item);
        }

        [HttpGet("get-items")]
        public async Task<IActionResult> GetItemsByCollectionId(int collectionId) => Ok(await _itemService.GetItemsByCollectionId(collectionId));

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemById(int id)
        {
            await _itemService.DeleteItemById(id);
            return Ok("Deleted");
        }

        [HttpDelete("delete-items")]
        public async Task<IActionResult> DeleteItemsByIds([FromBody] int[] ids)
        {
            await _itemService.DeleteGroupOfItemsById(ids);
            return Ok("Deleted");
        }

        [HttpPut("edit-item/{id}")]
        public async Task<IActionResult> EditItem(int id, [FromBody] ItemDto updatedItemDto)
        {
            try
            {
                var editedItem = await _itemService.EditItem(id, updatedItemDto);
                return Ok(editedItem);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("get-item-by-id/{id}")]
        public async Task<IActionResult> GetItemById(int id) 
        {
            var item = await _itemService.GetItemById(id);
            if(item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("get-items-by-tag-id/{id}")]
        public async Task<IActionResult> GetItemsByTagId(int id)
        {
            var item = await _itemService.GetItemsByTagId(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("get-last-added-items")]
        public async Task<IActionResult> GetLastFiveItem()
        {
            var item = await _itemService.GetLastItems(10);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }



    }

}
