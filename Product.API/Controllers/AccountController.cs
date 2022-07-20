using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Product.API.Helpers;
using Product.API.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Product.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSetting;
        public AccountController(SignInManager<IdentityUser> signInManager,UserManager<IdentityUser> userManager,IOptions< AppSettings >appSettings)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            _appSetting = appSettings.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Register form) {
            List<string> errorList = new List<string>();
            var user = new IdentityUser() { 
            Email=form.Email,
            UserName=form.Username,
            SecurityStamp=Guid.NewGuid().ToString()
            
            };

            var result = await _userManager.CreateAsync(user, form.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Customer");
                return Ok(new { userName = user.UserName, email = user.Email, status = 1, message = "Registration Successfull" });
            }
            else {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                    errorList.Add(error.Description);   
                }
            }

            return BadRequest(new JsonResult(errorList));
            
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login form) {
            var user =await _userManager.FindByNameAsync(form.Username);
            var roles = await _userManager.GetRolesAsync(user);
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSetting.Secret));
            if (user!=null && await _userManager.CheckPasswordAsync(user,form.Password)) {
                var tokenHandler = new JwtSecurityToken();

                var tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new System.Security.Claims.ClaimsIdentity(new Claim[] {
                        new Claim(JwtRegisteredClaimNames.Sub, form.Username),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.NameIdentifier, form.Username),
                        new Claim(ClaimTypes.Role, roles.FirstOrDefault()),
                        new Claim("LogOn", DateTime.Now.ToString())
                    }),

                    SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                    Issuer = _appSetting.Site,
                    Audience = _appSetting.Audience,
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_appSetting.ExpireTime))

            };

        }

            ModelState.AddModelError("", "User is not Found");
            return Unauthorized(new { LoginError = "please check your crednetials" });
        }
    }
}
