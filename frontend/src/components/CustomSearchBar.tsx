import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchComponents {
    searchValue: string;
    setSearchValue: any;
}

export const CustomSearchBar: React.FC<SearchComponents> = ({searchValue, setSearchValue}) => {
    return (<>
        <div className="my-5">
            <Row>
                <Col>
                    <div className="input-group" id="search-bar">
                        <input className="form-control border-secondary py-2" 
                                type="search" 
                                value={searchValue}
                                onChange={(delta) => {
                                setSearchValue(delta.target.value);
                                }}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary py-2 square-border" type="button">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </>);
}