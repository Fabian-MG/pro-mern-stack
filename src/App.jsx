const continents = ['Africa','America','Asia','Australia','Antartida']

const helloContinents = Array.from(continents, c => `Hello ${c}!`);
const message = helloContinents.join(' ');

const element = (
    <div title="Outer div">
        <h1>Hello World</h1>
        {message}
    </div>
)

ReactDOM.render(element, document.getElementById('content'))
