using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Product.API.Model
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int OutOfStock { get; set; }
        [Required]
        public string ImgUrl { get; set; }
        [Required]
        public double Price { get; set; }

    }
}
