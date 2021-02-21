import { useEffect, useState } from "react";
export default function useOutsideAlerter(ref) {
    // console.log(ref)
    const [clickedOutSide, setClickedOutSide] = useState(false)
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setClickedOutSide(true)
        }
        else {
          setClickedOutSide(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        setClickedOutSide(false)
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
    // console.log(clickedOutSide)
    return clickedOutSide
  }