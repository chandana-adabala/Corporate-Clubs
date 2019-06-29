using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CorporateClubs.Services.DBModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using CorporateClubs.Services.Interfaces;
using CorporateClubs.Services.Services;

namespace CorporateClubs.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
       services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
            .AddAzureADBearer(options => Configuration.Bind("AzureAd", options));

            //services.AddDbContextPool<ModelContext>(opts=> 
            //opts.UseSqlServer(Configuration.GetConnectionString("CorporateClubsDB")));
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IClubs, ClubsService>();
            services.AddSingleton<IUsers, UserService>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddCors(c =>
            {
                c.AddPolicy("allowmyorgin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

          });


            services
             .AddAuthentication(sharedOptions =>
             {
                 sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
             })
             .AddJwtBearer(options =>
             {
                 options.Audience = Configuration["AzureAd:ClientId"];
                 options.Authority = $"{Configuration["AzureAd:Instance"]}{Configuration["AzureAd:TenantId"]}";
             });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseCors("allowmyorgin");
            app.UseMvc();
        }
    }
}


