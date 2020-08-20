class LocationSearchBox extends React.Component {
    state = {
        searchText: '',
        results: {},
        showResults: false,
        truncated: false,
        actualCount: 0
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
                this.setState({ truncated: response.truncated });
                this.setState({ actualCount: response.actualCount });
                this.setState({ results: response.locations });
                this.setState({ showResults: response.locations.length > 0 });
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
                                actualCount={this.state.actualCount}
                                truncated={this.state.truncated}
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
                <div class="card">
                    <div class="card-header">
                        <h2>LOCATIONS</h2>
                    </div>

                    <div class="card-body">
                        <div class="container">
                            <div class="row">
                                {
                                    this.props.truncated
                                        ?
                                        <div class="col">
                                            <h4>Only shwoing top 20 records.</h4>
                                            <em>Please narrow your search.</em>
                                        </div>
                                        :
                                        <div class="col">
                                            <span>&nbsp;</span>
                                        </div>
                                }
                                <div class="col">
                                    <h4>Matching Records: {this.props.actualCount}</h4>
                                    <em>Select a record to view nearby locations</em>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div id="accordion">
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
            </div >
        );
    }
}

class LocationElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBeenSet: false,
            nearbyLocations: {},
            truncated: false,
            actualCount: 0
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
                this.setState({ hasBeenSet: true });
                this.setState({ nearbyLocations: response });
            }.bind(this))
                .fail(function (xhr, status, error) {
                    alert(error);
                }.bind(this));
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
        const coordUrl = 'https://www.google.com/maps/search/?api=1&query=' + this.props.location.latitude + ',' + this.props.location.longitude;
        return (
            <div class="card">
                <div class="card-header" {...headerId}>
                    <h5 class="mb-0">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8">
                                    <a class="collapsed" style={btnlocation} data-toggle="collapse" {...dataTarget} aria-expanded="true" {...ariaControls} onClick={this.handleLocationButtonClick}>
                                        <strong>{this.props.location.address}, {this.props.location.city}, {this.props.location.state} {this.props.location.zip}</strong>
                                    </a>
                                </div>
                                <div class="col-md-4">
                                    <img src="pin.png" alt="Location Search" width="25" height="25" />
                                    <a href={coordUrl} target="_blank">
                                        <em>({this.props.location.latitude}, {this.props.location.longitude})</em>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </h5>
                </div>

                <div {...collapseId} class="collapse" {...ariaLabelledby} data-parent="#accordion">
                    <div class="card-body">

                        {
                            this.state.nearbyLocations.length > 0
                                ?
                                this.state.nearbyLocations.map((location, i) => {
                                    return <NearbyLocation
                                        selectedLocation={this.props.location}
                                        location={location}
                                        showHR={this.state.nearbyLocations.length - 1 != i}
                                    />
                                })
                                : null
                        }

                    </div>
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
        const coordUrl = 'https://www.google.com/maps/dir/?api=1&origin=' + this.props.location.latitude + ',' + this.props.location.longitude + '&destination=' + this.props.selectedLocation.latitude + ',' + this.props.selectedLocation.longitude

        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <strong>{this.props.location.address}, {this.props.location.city}, {this.props.location.state} {this.props.location.zip}</strong>
                    </div>
                    <div class="col-md-4">
                        <img src="directions.png" alt="Location Search" width="25" height="25" />
                        <a href={coordUrl} target="_blank">
                            <em>({this.props.location.latitude}, {this.props.location.longitude})</em>
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        Distance to selected location: {this.props.location.distanceToSelectedLocation} Miles
                    </div>
                </div>
                {
                    this.props.showHR
                        ? <hr />
                        : null
                }

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

            <div class="card">
                <div class="card-header">
                    <h2>LOCATION SEARCH</h2>
                </div>

                <div class="card-body">
                    <form id="searchForm">
                        <div class="form-row">
                            <div class="input-group input-group-lg">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        <img src="SearchIcon.png" alt="Location Search" width="25" height="25" />
                                    </span>
                                </div>
                                <input
                                    class="form-control"
                                    id="txtSearchText"
                                    type="search"
                                    placeholder="123 Address St"
                                    aria-label="Address"
                                    onChange={this.handleSearchTextChange} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}