import React, { Component } from 'react';
import { get, isArray, map, clone, filter, find, forEach } from 'lodash';
import { Icon } from 'semantic-ui-react';
import './Container.css';

const COLORS = [
  'lightblue', 'lightgrey', 'lightpink', 'lightgreen', 'lightgoldenrodyellow'
];
const MTOP = 309;
const HEIGHT = 50;
const WIDTH = 50;
const START = 0;
const COLS = 6;
const ROWS = [MTOP, 259, 209, 159, 109];
const R = { [MTOP]: 0, 259: 1, 209: 2, 159: 3, 109: 4 };
const PLAYROWS = 5;

let won = false;

export class Container extends Component {
  state = { blocks: [], step: START, left: 50, hiscore: 1000, showHelp: false };

  componentDidMount() {
    this.resetBlocks();
  }

  getHiScore = () => {
    return localStorage.getItem('hiscore') || 1000;
  }

  resetBlocks = async (e) => {
    if (e) e.preventDefault();
    const rows = [];
    won = false;
    for (let r = 0; r < PLAYROWS; r++) {
      const row = new Array(COLS);
      row.fill();
      const blocks = map(row, (block, i) => {
        const color = Math.floor((Math.random() * 5));
        return {
          left: 66 + (i * WIDTH),
          top: 200 - (r * HEIGHT),
          mTop: MTOP - (r * HEIGHT),
          background: COLORS[color],
          opacity: .3,
          row: r,
          block: i,
          useClass: ''
        }
      })
      rows.push(blocks);
    }
    const hiscore = await this.getHiScore();
    this.setState({ left: 50, step: START, blocks: rows, hiscore }, () => this.startMove());
  }

  getSingleAdj = (co, color, blocks) => {
    let cs = [];
    const mapBlocks = (co, color, blocks) => {
      const [x, y] = co;
      const a = [x, y - 1];
      const b = [x, y + 1];
      const c = [x - 1, y];
      const d = [x + 1, y];
      return map([a, b, c, d], ([x, y]) => {
        if (blocks[x] && blocks[x][y] && blocks[x][y].background === color && blocks[x][y].opacity !== 1) {
          blocks[x][y] = { ...blocks[x][y], opacity: 1 };
          return [x, y]
        }
      });
    }

    cs = mapBlocks(co, color, blocks);

    if (cs.length > 0) {
      cs.forEach(c => {
        if (c) {
          mapBlocks(c, color, blocks);
        }
      });
    }
    return blocks;
  }

  findAdjacent = (coor, block) => {
    const blocks = clone(this.state.blocks);
    const [x, y] = coor;
    const op = block.opacity === 1 ? 0.3 : 1;
    const newBlock = { ...block, opacity: op };
    const color = block.background;
    const newBlocks = this.getSingleAdj(coor, color, blocks);

    newBlocks[x][y] = newBlock;

    const setStateAfterTimeOut = () => this.setState({ blocks: newBlocks }, this.clickMultipleBlocks());

    setTimeout(() => {
      setStateAfterTimeOut();
    }, 10);
  }

  findHighlightedBlocks = () => {
    const blocks = clone(this.state.blocks);
    let coords = [];
    const newBlocks = map(blocks, (rows, y) => {
      return map(rows, (block, x) => {
        const op = block.opacity === 1
        if (op) {
          coords.push([x, y]);
        }
        const b = {
          ...block,
          opacity: op ? 0 : block.opacity
        };
        return b;
      });
    });
    const setStateAfterTimeOut = () => {
      this.setState({ blocks: newBlocks }, this.startMultipleMove(newBlocks, coords));
    };

    setTimeout(() => {
      setStateAfterTimeOut();
    }, 300);
  }

  startMultipleMove = (newBlocks, coords) => {
    if (coords.length < 1) return;
    const c = {};
    coords.forEach(([blockIndex, row]) => {
      c[blockIndex] = c[blockIndex] ? c[blockIndex] + 1 : 1;
      const column = map(newBlocks, (row) => row[blockIndex]);
      const newColumn = this.getNewColumn(column, row, c[blockIndex]);
      newBlocks = this.getNewBlocks(newBlocks, blockIndex, newColumn);

    });
    this.setState({ blocks: newBlocks, step: this.state.step + 1 }, () => this.startMove());
  }

  clickMultipleBlocks = () => {
    this.findHighlightedBlocks();
  }

  clickBlock = (block, row, blockIndex) => {
    if (block.useClass === 'boston') return;
    this.findAdjacent([row, blockIndex], block);
  }

  getNewColumn = (column, row, c) => {
    const multi = c || 1;
    return map(column, (block, i) => {
      if (!block.top) return {};
      return i > row ? { ...block, mTop: block.top + (HEIGHT * multi) } : block;
    });
  }

  getNewBlocks = (blocks, blockIndex, newColumn) => {
    return map(blocks, (row, i) => {
      row[blockIndex] = newColumn[i];
      return row;
    })
  }

  moveBlocksDown = (row, blockIndex) => {
    const blocks = clone(this.state.blocks);
    const column = map(blocks, (row) => row[blockIndex]);
    const newColumn = this.getNewColumn(column, row);
    const newBlocks = this.getNewBlocks(blocks, blockIndex, newColumn);
    this.setState({ blocks: newBlocks }, () => this.startMove());
  }

  startMove = () => {
    const mapping = () => {
      const blocks = clone(this.state.blocks);
      let change = 0;
      const newBlocks = map(blocks, row => {
        return map(row, block => {
          if (block.top !== block.mTop) change++;
          return block.top === block.mTop ? block : { ...block, top: block.top + 1 };
        })
      })
      if (change === 0) return this.setState({ blocks: newBlocks }, () => this.afterMove());
      setTimeout(() => {
        setting(newBlocks);
      }, 2)
    }

    const setting = (blocks) => this.setState({ blocks }, () => mapping());

    mapping();
  }

  afterMove = () => {
    const blocks = clone(this.state.blocks);
    let allHidden = [];
    blocks.forEach(row => {
      const hidden = filter(row, (block) => block.opacity === 0);
      allHidden = [...allHidden, ...hidden];
    });
    const repl = [];
    map(blocks, row => {
      return map(row, block => {
        const f = find(allHidden, b => b.top === block.top && b.left === block.left);
        if (f && f !== block) repl.push([f, block]);
      })
    });
    repl.forEach(block => {
      blocks[block[0].row][block[0].block] = { ...block[1], row: block[0].row, block: block[0].block };
      blocks[block[1].row][block[1].block] = {};
    })
    allHidden.forEach(block => {
      if (blocks[block.row][block.block] && blocks[block.row][block.block].opacity === 0) blocks[block.row][block.block] = {};
    });
    let left = 0;
    const missed = [];
    blocks.forEach((r, i) => r.forEach((b, ii) => {
      if (b.opacity > 0 && b.useClass !== 'boston') left++;
      if (b.opacity === 0) blocks[i][ii] = {};
      if (b.top && b.top !== ROWS[i]) missed.push([b, i, ii]);
    }));
    missed.forEach(([block, x, y]) => {
      blocks[x][y] = {};
      const target = R[block.top];
      if (block.opacity > 0 && blocks[target]) blocks[target][y] = block;
    })
    const addColumnBlock = this.checkEmptyColumns(blocks);

    this.setState({ blocks: addColumnBlock.blocks, left });
    if (addColumnBlock.change === 1) {
      setTimeout(() => {
        this.startMove();
      }, 25);
    };
  }

  checkEmptyColumns = (blocks) => {
    const row = new Array(COLS);
    row.fill(0);
    map(blocks, r => {
      map(r, (b, i) => row[i] = b.top ? row[i] + b.top : row[i]);
    });
    let change = 0;
    forEach(row, (column, i) => {
      if (column === 0) {
        change = 1;
        blocks[4][i] = {
          left: 66 + (i * WIDTH),
          top: 100,
          mTop: MTOP,
          opacity: .3,
          row: 4,
          block: i,
          useClass: 'boston'
        }
      }
    })
    return { blocks, change };
  }

  checkMissed = (blocks) => {
    const missed = [];
    blocks.forEach((r, i) => r.forEach((b, ii) => {
      if (b.top && b.top !== ROWS[i]) missed.push([b, i, ii]);
    }));
    return missed;
  }

  drawBlock = (block, row, index) => {
    if (!block.top) return;
    return (
      <div
        className={`block ${block.useClass}`}
        style={{ top: block.top, left: block.left, background: block.background, opacity: block.opacity }}
        onClick={() => this.clickBlock(block, row, index)}
        key={`block${row}${index}`}
      >
      </div>
    )
  }

  drawCongrats = () => {

    let good = false;
    if (won === false && (!Number(this.state.hiscore) || this.state.step < Number(this.state.hiscore))) {
      good = true;
      won = true;
      localStorage.setItem('hiscore', this.state.step);
    }
    if (good) return (
      <div key='congrats' className='congrats'>
        <p>Congratulations! It took you {this.state.step} clicks!</p>
        <p></p>
        <p>You improved your High Score!!!</p>
      </div>
    );
    return (
      <div key='congrats' className='congrats'>
        <p>Congratulations! It took you {this.state.step} clicks!</p>
        <p></p>
        <p>Click reset to improve your score!</p>
      </div>
    )
  }

  drawBlocks = () => {
    const blocks = get(this.state, 'blocks');
    if (isArray(blocks)) {
      const rows =  map(blocks, (row, i) => {
        return map(row, (block, index) => this.drawBlock(block, i, index))
      })
      let congrats;
      if (this.state.left < 1) congrats = this.drawCongrats();
      rows.unshift(congrats);
      return rows;
    }
  }

  displayHiscore = () => {
    return this.state.hiscore < 1 || this.state.hiscore > 999 ? '-' : this.state.hiscore;
  }

  render() {
    const { showHelp } = this.state;
    const score = this.displayHiscore();
    return (
      <div className='blocks'>
        <div className='container'>
          <div className='field'>
            {this.drawBlocks()}
          </div>

        </div>
        <div className='block-numbers'>
          Clicks: {this.state.step}
          <span style={{ display: 'inline-block', marginLeft: '2rem' }}>
            Blocks Left: {this.state.left}
          </span>
          <span style={{ display: 'inline-block', marginLeft: '2rem' }}>
            High Score: {score}
          </span>
        </div>
        <div className='reset-holder'>
            <button className='reset-button' onClick={this.resetBlocks}>reset</button>
          </div>
        <div className='help-button'>
          <Icon name='question circle outline' color='grey' onClick={() => this.setState({ showHelp: !showHelp })} />
        </div>

        { showHelp && (
          <div className='help-text'>
              Click on a block and all the adjacent blocks with the same color will disappear, all the blocks above the ones that disappeared will fall down.<br />
              Remove all blocks in a row gives you a surprise.<br />
              Clear all rows in the least number of clicks.
          </div>
        )}
      </div>
    );
  }
}

export default Container;