import React from 'react'
import { Button, ButtonToolbar } from 'rsuite';
import Apper from './Dropdown';

function Visitorprofile() {
  return (
    <>
    <div className='visitor-main '>
<div className="card w-72 h-80 px-4 py-6 hover:bg-amber-100">
<div className=" header flex justify-between bg-slate-100">
<div><h4>Name</h4><p>subName</p></div>
<div><ButtonToolbar><Button color="orange" appearance="ghost" className='mt-2 ml-2 me-1.5'>
        pending....
      </Button></ButtonToolbar></div>
</div>
<div className="body">
<div><p className='text-slate-400'>visiting</p>
<h6>Asseigned:</h6>
</div>
<div className=''>
<p className='text-slate-400'>purpose of Visit</p>
<h6>Purpose:</h6>

</div>
<div className='created-time'>
    <p className='text-slate-400'>created Time</p>
    <h6>Date & Time</h6>
</div>
</div>
<div className="footer flex justify-around items-center">
<ButtonToolbar><Button color="green" appearance="primary" className='w-28 flex '>CheckIn</Button></ButtonToolbar>
<Apper/>

</div>
</div>
    </div>

    </>
  )
}

export default Visitorprofile