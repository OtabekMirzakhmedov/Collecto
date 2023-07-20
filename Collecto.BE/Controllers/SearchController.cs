using Collecto.BE.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public SearchController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult Search(string query)
        {
            var searchItems = _dataContext.Items
                .Include(i => i.Collection)
                .ThenInclude(c => c.User)
                .Include(item => item.Comments)
                .Where(item =>
                    EF.Functions.Like(item.Name, $"%{query}%") ||
                    item.Comments.Any(comment => EF.Functions.Like(comment.Content, $"%{query}%")) ||
                    item.CustomFieldValues.Any(cf => EF.Functions.Like(cf.Value, $"%{query}%"))
                )
                .Select(item => new
                {
                    Id = item.Id,
                    Name = item.Name,
                    Author = item.Collection.User.FullName,
                    CollectionName = item.Collection.Title,
                    CollectionId = item.Collection.Id,
                })
                .ToList();

            var searchCollections = _dataContext.Collections
                .Include(c => c.User)
                .Include(c => c.Topic)
                .Where(c =>
                    EF.Functions.Like(c.Title, $"%{query}%") ||
                    EF.Functions.Like(c.Description, $"%{query}%") ||
                    EF.Functions.Like(c.Topic.TopicName, $"%{query}%")
                )
                .Select(collection => new
                {
                    Id = collection.Id,
                    Title = collection.Title,
                    Author = collection.User.FullName,
                    TopicName = collection.Topic.TopicName,
                    NumberOfItems = collection.Items.Count
                })
                .ToList();

            return Ok(new { Items = searchItems, Collections = searchCollections });
        }

    }
}
