using API.Mappings;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }   

        public DbSet<Product> Products { get; set; } 
        protected override void OnModelCreating( ModelBuilder modelBuilder){
            modelBuilder.ApplyConfiguration(new ProductMapping());
        }

    }
}