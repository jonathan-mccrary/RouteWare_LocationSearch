using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RouteWare_LocationSearch.Contracts;
using RouteWare_LocationSearch.Models;
using RouteWare_LocationSearch.Utils;

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

        [Route("Home/Search")]
        [HttpPost]
        public ActionResult Search(string model)
        {
            _logger.LogInformation("Log message in the Search() method");
            var retVal = _csvReader.GetLocationsBySearch(model);
            LocationViewModel viewModel = new LocationViewModel()
            {
                ActualCount = retVal.Count,
                Locations = retVal.GetLocationModels().Take(20).ToList(),
                Truncated = retVal.Count > 20
            };
            return Json(viewModel);
        }

        [Route("Home/GetNearbyLocations")]
        [HttpPost]
        public ActionResult GetNearbyLocations(Location location)
        {
            _logger.LogInformation("Log message in the GetNearbyLocations() method");
            var retVal = _csvReader.GetLocationsNearSelectedLocation(location);

            return Json(retVal.GetLocationModels());
        }
    }
}