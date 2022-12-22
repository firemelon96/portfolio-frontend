import React from "react";

function LeftIcon() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <i class="ri-facebook-circle-fill text-secondary text-2xl"></i>
          <i class="ri-linkedin-box-fill text-secondary text-2xl"></i>
          <i class="ri-github-fill text-secondary text-2xl"></i>
          <i class="ri-instagram-fill text-secondary text-2xl"></i>
          <i class="ri-mail-fill text-secondary text-2xl"></i>
        </div>
        <div className="w-[1px] h-32 bg-secondary sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftIcon;
