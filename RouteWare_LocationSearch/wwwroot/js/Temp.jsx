
//const initialState = {
//    searchText: '',
//    results: {},
//    details: {},
//    showResults: false,
//    showDetails: false
//}

class LocationSearchBox extends React.Component {
    state = {
        searchText: '',
        results: {}
    };

    handleSearchChange = searchText => {
        let data = new FormData();
        data.append('searchText', searchText);
        let request = new XMLHttpRequest();
        request.open('get', this.props.searchUrl, true);
        request.onload = function () {
            let result = JSON.parse(request.responseText);

            this.setState({ results: result });
        }.bind(this);
        request.send(data);
    }

    //handleLocationSelect = (location) => {
    //    let request = new XMLHttpRequest();
    //    request.open('get', this.props.nearbyLocationsUrl, true);
    //    request.onload = function () {
    //        let result = JSON.parse(request.responseText);

    //        this.setState({ details: result });
    //        this.setState({ showDetails: true });
    //    }.bind(this);
    //    request.send();
    //}

    //restart = () => {
    //    this.setState(intitialState);
    //};

    render() {
        return (
            <SearchPanel onSearchChange={this.handleSearchChange} />
        );
    }
}

class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
    };

    handleSearchTextChange = (refName, e) => {
        e.preventDefault();

        let searchText = e.target.value;

        if (!searchText) {
            return;
        }
        this.props.onSearchChange({ searchText: searchText });
    };

    render() {
        return (
            <form id="searchForm">
                <div className="card card-5">
                    <div className="card-heading" style={{ color: "white" }}>
                        Location Search
                    </div>

                    <div className="card-body">
                        <div className="form-row">
                            <div className="name">
                                <img src="SearchIcon.png" alt="Location Search" width="15" height="15" /> Search:
                            </div>
                            <div className="value">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        id="txtSearchText"
                                        type="search"
                                        onkeyup={this.handleSearchTextChange}>
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        );
    }
}


class ResultsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };
    render() {
        return (
            <div id="resultsPanel">
                <div className="card card-5">
                    <div className="card-heading">
                        Results
                    </div>

                    <div className="card-body">
                        <div id="accordion">
                        </div>
                        {
                            this.props.locations.map((location, i) => {
                                return (<ResultElement
                                    location={location}
                                    index={i}
                                    headerId={'header' + i}
                                    collapseId={'collapse' + i}
                                    onLocationSelect={this.props.onLocationSelect(location)} />)
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

}

class ResultElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBeenSet: false,
            nearbyLocations: {}
        };
    }

    render() {
        return (
            <div id="resultsPanel">
                <div class="card">
                    <div class="card-header" id="{this.props.headerId}">
                        <h5 class="mb-0">
                            //collapseOne needs to be populated by using the index
                            <button class="btn btn-link" data-toggle="collapse" data-target="#{this.props.collapseId}" aria-expanded="true" aria-controls="{this.props.collapseId}">
                                {this.props.location.Address} {this.props.location.City}, {this.props.location.State} ({this.props.location.Latitude}, {this.props.location.Longitude})
                            </button>
                        </h5>
                    </div>

                    <DetailElement
                        collapseId={this.props.collapseId}
                        headerId={this.props.headerId}
                        nearbyLocations={this.state.nearbyLocations}
                    />
                </div>
            </div>
        );
    }
}


class DetailElement extends React.Component {
    //contents of accordion
    //if possible, display location on map using google api

    constructor(props) {
        super(props);
        this.state = {
        };
    };
    render() {
        return (
            <div id="{this.props.collapseId}" class="collapse show" aria-labelledby="{this.props.headerId}" data-parent="#accordion">
                <div class="card-body">
                    {
                        this.props.nearbyLocations.map((location, i) => {
                            return (<NearbyLocation
                                location={location}
                                index={i} />)
                        })
                    }
                </div>
            </div>
        );
    }
}

class NearbyLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div>
            </div>
            //<div>
            //    {this.props.location.Address}
            //</div>
            //<div>
            //    {this.props.location.City}, {this.props.location.State} {this.props.location.Zip}
            //</div>
            //<div>
            //    Distance to selected location: {this.props.location.DistanceToSelectedLocation}
            //</div>
            //<div>
            //    --Put Map Here if possible--
            //</div>
        );
    }
}


//<div>
//    {
//        <DetailsPanel
//            locations={this.state.details}
//            showDetails={this.state.showDetails} />
//    }
//</div>





//locations = { this.state.results }
//showResults = { this.state.showResults }
//onLocationSelect = { this.state.handleLocationSelect }


//{
//    <ResultsPanel
//        locations={this.state.results}
//        showResults={this.state.showResults}
//        onLocationSelect={this.state.handleLocationSelect} />
//}



//<div class="input-group mb-3">
//    <div class="input-group-prepend">
//        <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
//        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
//    </div>
//    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
//</div>


//    <div className="name">

//        Address Search:<img src="SearchIcon.png" alt="Location Search" width="20" height="20" />
//    </div>
//    <div className="value">
//        <div className="form-group">
//            <input
//                className="form-control"
//                id="txtSearchText"
//                type="search"
//                value={this.state.searchText}
//                onChange={this.handleSearchTextChange}
//            />
//        </div>
//    </div>

//<div className="resultsPanel">



//</div>