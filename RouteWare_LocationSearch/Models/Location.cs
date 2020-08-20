using GeoCoordinatePortable;
using RouteWare_LocationSearch.Contracts;
using RouteWare_LocationSearch.Utils;

namespace RouteWare_LocationSearch.Models
{
    public class Location : ILocation
    {
        public Location()
        {

        }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string DistanceToSelectedLocation { get; set; }
        public GeoCoordinate Coordinate
        {
            get
            {
                return new GeoCoordinate(Latitude, Longitude);
            }
        }
    }
}