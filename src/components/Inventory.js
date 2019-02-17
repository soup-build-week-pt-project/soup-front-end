import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { CSSTransition } from 'react-transition-group';

const StyledInventory = styled.section`
  width: 80%;
  margin: 0 auto;
  background: #4ac4ff;
  border-radius: 25px;
  border: 1px solid #222;
  padding: 20px;
  padding-top: 70px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;

  h1 {
    font-size: 4rem;
    font-weight: 700;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  span {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2.5rem;
    cursor: pointer;

    &:active {
      transform: translateY(2px);
    }
  }
  /* React Transition Group styles */

  &.out-enter {
    * {
      transform: scale(1, 1) rotateX(0);
    }
  }
  &.out-enter-active {
    * {
      transform: scale(0.5, 0.5) rotateX(-360deg);
      transition: transform 0.5s linear;
    }
  }
  &.out-enter-done {
    * {
      transform: scale(0, 0) rotateX(-360deg);
    }
  }
`;

export const Card = styled.div`
  font-size: 2rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eee;
  min-height: 100px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 25px;
  border: 2px solid #222;
  cursor: pointer;

  &:hover {
    background: #d6d6d6;
  }

  h2 {
    font-size: 3rem;
  }
`;

class Inventory extends React.Component {
  state = {
    current: null,
    changing: false,
  };
  handleSelection = category => e => {
    this.setState({ changing: true });
    setTimeout(() => {
      this.setState({ current: category, changing: false });
    }, 500);
  };
  render() {
    return (
      <CSSTransition in={this.state.changing} timeout={500} classNames="out">
        <StyledInventory>
          {this.state.current ? (
            <>
              <span
                className="fas fa-undo-alt"
                onClick={e => this.setState({ current: null })}
              />
              <h1>{this.state.current}</h1>
              {this.props.inventory
                .filter(x => x.category_id === this.state.current)
                .map(x => (
                  <Item key={x.item} data={x} />
                ))}
            </>
          ) : (
            this.props.categories.map(x => (
              <Card key={x} onClick={this.handleSelection(x)}>
                <h2>{x}</h2>
              </Card>
            ))
          )}
        </StyledInventory>
      </CSSTransition>
    );
  }
}

export default Inventory;
