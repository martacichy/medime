//using medime.Models;
//using medime.Models.DBModels;
//using medime.UserData;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using medime.Models.DBModels;
using medime.Helpers;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using medime.Controllers;

namespace medime {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {

            services.AddCors();

            //Json Serializer
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options => 
                options.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver =
                new DefaultContractResolver());

            services.AddControllers();

            services.AddDbContext<UserContext>(options
                => options.UseMySql(Configuration.GetConnectionString("MedimeContext"),
                                    new MySqlServerVersion(new Version())));
            services.AddDbContext<IllnessTypesContext>(options
                => options.UseMySql(Configuration.GetConnectionString("MedimeContext"),
                                    new MySqlServerVersion(new Version())));
            services.AddDbContext<IllnessContext>(options
                => options.UseMySql(Configuration.GetConnectionString("MedimeContext"),
                                    new MySqlServerVersion(new Version())));
            services.AddDbContext<NotificationContext>(options 
                => options.UseMySql(Configuration.GetConnectionString("MedimeContext"), 
                                    new MySqlServerVersion(new Version())));
            services.AddDbContext<QuestionnaireContext>(options
                => options.UseMySql(Configuration.GetConnectionString("MedimeContext"),
                                    new MySqlServerVersion(new Version())));

            services.AddScoped<JwtService>();
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Medime", Version = "v1" });
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => {
              options.Cookie.Name = "UserLoginCookie";
              options.SlidingExpiration = true;
              options.ExpireTimeSpan = new TimeSpan(1, 0, 0); // Expires in 1 hour
              options.Events.OnRedirectToLogin = (context) => {
                  context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                  return Task.CompletedTask;
                  };

                  options.Cookie.HttpOnly = true;
                  // Only use this when the sites are on different domains
                  options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
              });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {

            app.UseCors(options => options
                .WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:4200" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Medime v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });

        }
    }
}
