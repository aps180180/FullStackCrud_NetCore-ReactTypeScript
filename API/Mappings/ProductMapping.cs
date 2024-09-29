
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Mappings
{
    public class ProductMapping : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Product");
            builder.HasKey(x => x.Id);
            
            builder.Property("Name")
                .HasColumnName("Name")
                .HasColumnType("NVARCHAR")
                .HasMaxLength(150)
                .IsRequired();
            
            
            builder.Property("Description")
                .HasColumnName("Description")
                .HasColumnType("NVARCHAR")
                .HasMaxLength(300)
                .IsRequired();
            
            builder.Property("Price")
                .HasColumnName("Price")
                .HasColumnType("Money")
                .IsRequired();

            builder.Property("IsInStore")
                .HasColumnName("IsInStore")
                .HasColumnType("Bit")
                .IsRequired();
        }
    }
}