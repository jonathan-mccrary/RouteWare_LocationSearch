using System;
namespace RouteWare_LocationSearch.Models
{
    public class LocationModel
    {
        public LocationModel()
        {
        }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double DistanceToSelectedLocation { get; set; }
    }
}
