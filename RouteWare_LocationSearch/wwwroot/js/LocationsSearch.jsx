const initialState = {
    searchText: '',
    results: {},
    details: {},
    showResults: false,
    showDetails: false
}

class LocationSearchBox extends React.Component {
    state = {
        searchText: ''
    };

    handleSearchSubmit = (searchText) => {
        let data = new FormData();
        data.append('searchText', searchText);
        let request = new XMLHttpRequest();
        request.open('get', this.props.searchUrl, true);
        request.onload = function () {
            let result = JSON.parse(request.responseText);

            this.setState({ results: result });
            this.setState({ showResults: true });
            this.setState({ details: {} });
            this.setState({ showDetails: false });
        }.bind(this);
        request.send(data);
    };

    handleLocationSelect = (location) => {
        let request = new XMLHttpRequest();
        request.open('get', this.props.nearbyLocationsUrl, true);
        request.onload = function () {
            let result = JSON.parse(request.responseText);

            this.setState({ details: result });
            this.setState({ showDetails: true });
        }.bind(this);
        request.send();
    }

    restart = () => {
        this.setState(intitialState);
    };

    render() {
        return (
            <div>
                <div className="searchPanel">
                    <SearchPanel onSearchSubmit={this.handleSearchSubmit} />
                </div>

                <div className="resultsPanel">
                    {
                        <ResultsPanel
                            locations={this.state.results}
                            showResults={this.state.showResults}
                            onLocationSelect={this.state.handleLocationSelect} />
                    }
                </div>

                <div>
                    {
                        <DetailsPanel
                            locations={this.state.details}
                            showDetails={this.state.showDetails} />
                    }
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

        let searchText = e.target.value;

        if (!searchText) {
            return;
        }
        this.props.onSearchSubmit({ searchText: searchText })
    };

    render() {
        return (
            <form id="searchForm">
                <div className="card card-5">
                    <div className="card-heading">
                        Location Search
                    </div>

                    <div className="card-body">
                        <div className="form-row">
                            <div className="name">Search Text</div>
                            <div className="value">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        id="txtSearchText"
                                        type="search"
                                        value={this.state.searchText}
                                        onChange={this.handleSearchTextChange}
                                    />
                                    <img src="SearchIcon.png" alt="Location Search" width="100" height="100">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}


class ResultsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        //locations = { this.state.results }
        //showResults = { this.state.showResults }
        //onLocationSelect = { this.state.handleLocationSelect } 
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
            hasBeenSet: false;
            nearbyLocations: {}
        };

        //locations = { this.state.results }
        //showResults = { this.state.showResults }
        //onLocationSelect = { this.state.handleLocationSelect } 
    };

    //show accordion element.
    //don't set contents until click event
    //if contents have been set, don't search again


    render() {
        return (
            <div id="resultsPanel">

            </div>
        );
    }
}

//class DetailsPanel extends React.Component {

//}

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
            <div id=""
            );
    }
}