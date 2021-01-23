

const EventComponent: React.FC = () => {

  // copying same annotation of inline function event - same thing
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  }

  // to implement a drag and drop feature
  // HTML5 has four properties - draggable, ondragstart, ondragover and ondrop
  // We can pass an Event Object as an arg to the function, so that we can access Event Object's properties & methods
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
  }

  return (
    <div>
      <h3>Events</h3>
      {/* when defining function inline on onChange prop, we don't get an error coz of 'type inference' */}
      {/* <input type="text" onChange={ e => console.log(e)} /> */}
      <input type="text" onChange={ handleChange} />

      <br/><br/>
      <div draggable onDragStart={handleDragStart}>Drag Me!</div>

    </div>
  )
}

export default EventComponent

// Draggable, when added as an attribute to a HTML element, makes the target element to become draggable.

// ondragstart, is called immediately the element dragged. Usually the content to be dragged about is set at this point.

// ondragover, is added as an event listener to the element where the dragged content will be dropped. 
// In other words, it is used to specify where the content is to be dropped.

// ondrop, is called immediately the dragged content is released on the element that contains the ondragover event listener.
