import React, { Component } from 'react';
import * as _ from 'lodash';

// Components
import SearchBook from './searches/SearchBook';
import BookInList from './BookInList';

export default class AppContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchOptions: {
                orderBy: 'title',
                orderDir: 'asc',
                filterText: '',
            },
            bookList: [],
            isLoadingContents: false
        };
    }

    // Auxiliary
    fetchAllBooks = () => {
        console.log('fetching...')
        this.setState({
            isLoadingContents: true,
            bookList: []
        });

        fetch(`https://YOUR-URL-API.REGION.amazonaws.com/dev/books`)
            .then(result => result.json())
            .then(data => this.setState({
                bookList: data.Items,
                isLoadingContents: false
            }));
    }

    // State Events
    changeOrder = (by, dir) => {
        this.setState({
            searchOptions: {
                orderBy: by,
                orderDir: dir,
                filterText: this.state.searchOptions.filterText
            }
        });
    }

    filterList = text => {
        this.setState({
            searchOptions: {
                filterText: text,
                orderBy: this.state.searchOptions.orderBy,
                orderDir: this.state.searchOptions.orderDir
            }
        });
    }

    detailItem = this.props.onDetailBook;


    // React Lifecycles
    componentDidMount = () => {
        // api to list all books in dynamoDB
        this.fetchAllBooks();
    }

    componentDidUpdate = () => {
        if (this.props.refresh) {
            this.props.onRefresh();
            this.fetchAllBooks();
        }
    }

    render = () => {
        let allBooks = this.state.bookList;
        let orderBy = this.state.searchOptions.orderBy;
        let orderDir = this.state.searchOptions.orderDir;
        let filterText = this.state.searchOptions.filterText;

        let filteredList = [];
        // filter list
        allBooks.forEach(item => {
            if (
                item.title.toLowerCase().indexOf(filterText) !== -1 ||
                item.author.toLowerCase().indexOf(filterText) !== -1 ||
                item.publisher.toLowerCase().indexOf(filterText) !== -1 ||
                item.publishDate.toLowerCase().indexOf(filterText) !== -1
            ) {
                filteredList.push(item);
            }
        });

        // order list
        filteredList = _.orderBy(filteredList, item => {
            return item[orderBy].toLowerCase();
        }, orderDir);

        filteredList = filteredList.map((item, index) => {
            return (
                <BookInList book={item}
                    key={index}
                    user={this.props.user}
                    onBookAction={this.detailItem} />
            );
        });

        return (
            <div className="main-content container">
                <SearchBook orderBy={this.state.searchOptions.orderBy}
                    orderDir={this.state.searchOptions.orderDir}
                    onSortList={this.changeOrder}
                    onFilterList={this.filterList} />

                <div className="book-list">
                    <ul className="media-list">
                        {filteredList}
                    </ul>
                </div>
            </div>
        );
    }
}