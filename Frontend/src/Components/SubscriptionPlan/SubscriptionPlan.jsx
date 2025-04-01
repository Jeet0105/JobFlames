import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SubscriptionPlans = () => {

    const[plans,setPlans] = useState([]);

    useEffect(() => {
        fetchSubscription();
    }, [])

    const fetchSubscription = async ()=>{
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/subscription/getAllSubscription`, { withCredentials: true })
        .then(function (response){
            console.log('response: ', response);
            if (response?.data?.success){
                setPlans(response?.data?.data);
            }
            else{
                toast.error(response?.data?.message);
            }
        })
        .catch(function (error){
            console.log("Error from the axios : ",error);
            toast.error(error?.response?.data?.message);
        })
    }
    

  return plans.length > 0 && (
    <div className="flex justify-center items-center py-12 min-h-[100%] bg-gray-100 gap-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="w-[320px] p-6 rounded-[50px] shadow-lg bg-white flex flex-col justify-between text-center"
          style={{ borderRadius: "0px 50px 0px 50px", minHeight: "400px" }} // Fixed height for equal size
        >
          <div>
            <h3 className="text-lg font-semibold text-black">{plan.name}</h3>
            <p className="text-4xl font-bold text-orange-500 mt-1">₹{plan.price}</p>
            <p className="text-sm text-gray-600">{plan.duration} Days</p>
            <p className="text-sm text-gray-600">{plan.job_post_limit} Job Posts</p>
            <p className="text-xs text-gray-500 mt-2">{plan.description}</p>
          </div>

          <div className="border-t w-full my-3"></div>

          <ul className="space-y-2 w-full text-left flex-1">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 rounded-full text-black flex items-center justify-center border border-orange-500 bg-gray-200 text-xs">
                  ✓
                </span>
                <span className="text-sm text-black">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="mt-4 w-full py-2 rounded-lg shadow-md border border-orange-500 bg-orange-500 text-white font-semibold">
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
