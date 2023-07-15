namespace Collecto.BE.Models
{
    public class Like
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Item Item { get; set; }
    }
}
