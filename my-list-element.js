import {html, css, LitElement} from 'lit';
import {range} from 'lit/directives/range.js';
import {map} from 'lit/directives/map.js';
import {repeat} from 'lit/directives/repeat.js';

export class MyListElement extends LitElement{
  static styles = css`
    /* playground-fold */
    :host {
      display: block;
      width: 400px;
      height: 400px;
    }
    #board {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      border: 2px solid #404040;
      box-sizing: border-box;
      height: 100%;
    }
    #board > div {
      padding: 2px;
    }
    .black {
      color: #ddd;
      background: black;
    }
    .white {
      color: gray;
      background: white;
    }
    /* playground-fold-end */

  `;

  static properties = {
    items: {state: true},
    names: {state: true},
    friends: {state: true},
    pets: {state: true},
    includePets: {state: true},
    tasks: {state: true},
    things: {state: true},
  }
  constructor(){
    super()
    this.items = new Set(['Apple', 'Banana', 'Grape', 'Orange', 'Lime']);
    this.names = ['Chandler', 'Phoebe', 'Joey', 'Monica', 'Rachel', 'Ross'];
    this.friends = ['Harry', 'Ron', 'Hermione'];
    this.pets = [
      {name: 'Hedwig', species: 'Owl'},
      {name: 'Scabbers', species: 'Rat'},
      {name: 'Crookshanks', species: 'Cat'},
    ];
    this.includePets = true;
    this.tasks = [
      {id: 'a', label: 'Learn Lit'},
      {id: 'b', label: 'Feed the cat'},
      {id: 'c', label: 'Go for a walk'},
      {id: 'd', label: 'Take a nap'},
    ];
    this.things = [
      'Raindrops on roses',
      'Whiskers on kittens',
      'Bright copper kettles',
      'Warm woolen mittens',
    ];
  }

  render(){
    return html`
    <p>My unique fruits</p>
    <ul>
      <!-- TODO: Utilize map directive to render items. -->
      ${map(this.items, (item) => {
        return html`<li>${item}</li>`
      })}
    </ul>
    <p>A list of names that include the letter "e"</p>
    <ul>
      <!-- TODO: Render list items of filtered names. -->
      ${this.names.filter((name)=>{
        return name.match(/e/i)
      }).map((name) => { 
        return html`<li>${name}</li>`
      })}
    </ul>
    <h2>renderables array</h2>
    <button @click=${() => this._togglePetVisibility()}>
        ${this.includePets ? 'Hide' : 'Show'} pets
      </button>
      <p>My magical friends</p>
      <ul>
        <!-- TODO: Render templates. -->
        ${this.renderablesArray()}
      </ul>
      <p>Let's play a game!</p>
      <div id="board">
        ${map(range(8), (row) => map(range(8), (col) => html`
          <div class="${getColor(row, col)}">${getLabel(row, col)}</div>
        `))}
      </div>
      <p>Things to do today:</p>
      <button @click=${() => this._sort(1)}>Sort ascending</button>
      <button @click=${() => this._sort(-1)}>Sort descending</button>
      <ul>
        ${repeat(
          this.tasks,
          (task) => task.id,
          (task) => html`
            <li>
              <label><input type="checkbox" />${task.label} (${task.id})</label>
            </li>
          `
        )}
      </ul>
      <p>A few of my favorite things</p>
      <ul>
        <!-- TODO: Add click event handlers for the delete button  below. -->
        ${map(
          this.things,
          (thing, index) => html`
            <li>
              ${thing}
              <button @click=${() => this._deleteThing(index)} >Delete</button>
            </li>
          `
        )}
      </ul>
    `;
  }

  _togglePetVisibility() {
    this.includePets = !this.includePets;
  }

  renderablesArray(){
    const listItems = [];
    this.friends.forEach((friend) => {
      listItems.push(html`<li>${friend}</li>`);
    });
    if (this.includePets) {
      this.pets.forEach((pet) => {
        listItems.push(html`<li>${pet.name} (${pet.species})</li>`);
      });
    }
    return listItems;
  }

  _sort(dir) {
    this.tasks.sort((a, b) => a.label.localeCompare(b.label) * dir);
    this.requestUpdate();
  }

  _deleteThing(index) {
    this.things = this.things.filter((_, i) => i !== index);
  }
}

customElements.define('my-list-element', MyListElement);

const getColor = (row, col) => ((row + col) % 2 ? 'white' : 'black');
const getLabel = (row, col) => `${String.fromCharCode(65 + col)}${8 - row}`;