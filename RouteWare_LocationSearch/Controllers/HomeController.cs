﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RouteWare_LocationSearch.Contracts;
using RouteWare_LocationSearch.Models;

namespace RouteWare_LocationSearch.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ICSVReader _csvReader;


        public HomeController(ILogger<HomeController> logger, ICSVReader csvReader)
        {
            _logger = logger;
            _csvReader = csvReader;
        }

        public IActionResult Index()
        {
            _logger.LogInformation("Log message in the Index() method");
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public ActionResult Search(string searchString)
        {
            _logger.LogInformation("Log message in the Search() method");
            var retVal = _csvReader.GetLocationsBySearch(searchString);
            return Json(retVal);
        }

        public ActionResult GetNearbyLocations(Location location)
        {
            _logger.LogInformation("Log message in the GetNearbyLocations() method");
            var retVal = _csvReader.GetLocationsNearSelectedLocation(location);
            return Json(retVal);
        }
    }
}