using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Product.API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Product.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public ProductsController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await _applicationDbContext.Products.ToListAsync());
        }
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product.API.Model.Product form)
        {
            var newProduct = new Product.API.Model.Product()
            {
                Name = form.Name,
                Description = form.Description,
                ImgUrl = form.ImgUrl,
                OutOfStock = form.OutOfStock,
                Price = form.Price,

            };

            await _applicationDbContext.Products.AddAsync(newProduct);
            await _applicationDbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromRoute] int Id, [FromBody] Product.API.Model.Product form)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var product = _applicationDbContext.Products.FirstOrDefault(p => p.ProductId == Id);
            if (product == null)
            {
                return NotFound();
            }
            product.Name = form.Name;
            product.ImgUrl = form.ImgUrl;
            product.OutOfStock = form.OutOfStock;
            product.Price = form.Price;
            _applicationDbContext.Entry(product).State = EntityState.Modified;
            await _applicationDbContext.SaveChangesAsync();
            return Ok(new JsonResult("The Product with Id" + Id + " is updated "));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProduct([FromRoute] int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var product = _applicationDbContext.Products.FirstOrDefault(p => p.ProductId == Id);
            if (product == null)
            {
                return NotFound();
            }
            _applicationDbContext.Products.Remove(product);
            await _applicationDbContext.SaveChangesAsync();
            return Ok(new JsonResult("The Product with Id" + Id + " is Delteted "));
        }


    }
}
