const initialState = {
    searchText: '',
    results: {},
    details: {},
    showResults: false,
    showDetails: false
}

class LocationSearchBox extends React.Component {
    state = {
        searchText = ''
    };

    handleSearchSubmit = () => {
        let request = new XMLHttpRequest();
        request.open('get', this.props.searchUrl, true);
        request.onload = function () {
            let result = JSON.parse(request.responseText);

            this.setState({ results: result });
            this.setState({ showResults: true });
            this.setState({ details: {} });
            this.setState({ showDetails: false });
        }.bind(this);
        request.send();
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

}


class ResultsPanel extends React.Component {

}

class ResultElement extends React.Component {

}

class DetailsPanel extends React.Component {

}

class DetailElement extends React.Component {

}