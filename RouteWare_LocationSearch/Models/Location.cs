
using GeoCoordinatePortable;

namespace RouteWare_LocationSearch.Models
{
    public class Location
    {
        public Location()
        {

        }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public double Latitude { get; set; }
        public double Longitudue { get; set; }
        public GeoCoordinate Coordinate
        {
            get
            {
                return new GeoCoordinate(Latitude, Longitudue);
            }
        }
    }
}
