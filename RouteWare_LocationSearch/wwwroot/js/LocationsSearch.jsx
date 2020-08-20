class LocationSearchBox extends React.Component {
    state = {
        searchText: '',
        results: {},
        showResults: false,
    };

    handleSearchSubmit = (searchText) => {
        if (!searchText) {
            this.setState({ showResults: false });
            this.setState({ results: {} });
        }
        else {
            $.post(this.props.searchUrl, {
                model: searchText
            }, function (response) {
                let test = response;
                this.setState({ showResults: response.length > 0 });
                this.setState({ results: response });
            }.bind(this));
        }
    };




    render() {
        return (
            <div>
                <div class="searchPanel">
                    <SearchPanel onSearchSubmit={this.handleSearchSubmit} />
                </div>
                <br />
                {
                    this.state.showResults
                        ? <div class="resultsPanel">
                            <LocationsPanel
                                locations={this.state.results}
                                handleLocationButtonClick={this.handleLocationButtonClick}
                                nearbyLocationsUrl={this.props.nearbyLocationsUrl}
                            />
                        </div>
                        : null
                }
            </div>
        );
    }
}

class LocationsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: props.locations
        };
    };
    render() {
        return (
            <div id="resultsPanel">
                <div class="card card-5">
                    <div class="card-heading">
                        Results
                    </div>

                    <div class="card-body">
                        <div id="accordion">

                            <h3>Matching Records: {this.props.locations.length}</h3>
                            <div id="locationsAccordion">
                                {
                                    this.props.locations.length > 0
                                        ?
                                        this.props.locations.map((location, i) =>
                                            <LocationElement
                                                location={location}
                                                index={i}
                                                nearbyLocationsUrl={this.props.nearbyLocationsUrl}
                                            />)
                                        : null
                                }
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

class LocationElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBeenSet: false,
            nearbyLocations: {}
        };
    };

    handleButtonClick = () => {
        this.props.handleButtonClick(this.props.location);
    };

    handleLocationButtonClick = (e) => {
        e.preventDefault();
        if (!this.state.hasBeenSet) {
            $.post(this.props.nearbyLocationsUrl, {
                location: this.props.location
            }, function (response) {
                let test = response;
                alert(test.length);
                this.setState({ nearbyLocations: response });
                this.setState({ hasBeenSet: true });
            }.bind(this))
                .fail(function (xhr, status, error) {
                    alert(error);
                }).bind(this);
        }

    };
    render() {
        const headerId = { ['id']: 'header' + this.props.index };
        const dataTarget = { ['data-target']: '#collapse' + this.props.index };
        const ariaControls = { ['aria-controls']: 'collapse' + this.props.index };
        const collapseId = { ['id']: 'collapse' + this.props.index };
        const ariaLabelledby = { ['aria-labelledby']: 'collapse' + this.props.index };
        const btnlocation = {
            color: 'black',
            textDecoration: 'none!important'
        };
        return (
            <div class="card">
                <div class="card-header" {...headerId}>
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" style={btnlocation} data-toggle="collapse" {...dataTarget} aria-expanded="true" {...ariaControls} onClick={this.handleLocationButtonClick}>
                            {this.props.location.address}, {this.props.location.city}, {this.props.location.state}
                        </button>
                    </h5>
                </div>

                <div {...collapseId} class="collapse" {...ariaLabelledby} data-parent="#accordion">
                    <div class="card-body">
                        <ul>
                            {
                                this.state.nearbyLocations.length > 0
                                    ?
                                    //this.props.locations.map((location, i) =>
                                    //    <LocationElement
                                    //        location={location}
                                    //        index={i}
                                    //    />)
                                    this.state.nearbyLocations.map((location, i) => {
                                        return <li>
                                            <div>
                                                {location.address}, {location.city}, {location.state} {location.zip}
                                            </div>
                                            <div>
                                                Distance {location.distanceToSelectedLocation}
                                            </div>
                                        </li>
                                    })
                                    : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    };

    handleSearchTextChange = (e) => {
        e.preventDefault();
        this.props.onSearchSubmit(e.target.value)
    };

    render() {
        return (
            <form id="searchForm">
                <div class="card card-5">
                    <div class="card-heading">
                        Location Search
                    </div>

                    <div class="card-body">
                        <div class="form-row">
                            <div class="name">
                                <img src="SearchIcon.png" alt="Location Search" width="20" height="20" />
                                Search:
                            </div>
                            <div class="value">
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        id="txtSearchText"
                                        type="search"
                                        onChange={this.handleSearchTextChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}



//request.fail = function (response) {
//    alert("error");
//}.bind(this);

//onLocationSelect={this.state.handleLocationSelect}


//{
                            //    this.props.locations.map((location, i) => {

                            //        return (
                            //            <div>{location.Address} </div>
                            //            //
                            //        );
                            //    })
                            //}


                    //<DetailElement
                    //    collapseId={this.props.collapseId}
                    //    headerId={this.props.headerId}
                    //    nearbyLocations={this.state.nearbyLocations}
                    ///>