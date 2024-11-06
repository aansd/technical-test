import React, { useContext, useEffect } from 'react';
import { ApiContext } from '../../Api/API';

const Profile = () => {
  const { user, showUser, token } = useContext(ApiContext);

  useEffect(() => {
    if (token) {
      showUser();
    }
  }, [token, showUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mt-5" style={{ maxWidth: "700px" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Full Name</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user?.us_name || 'No Name Available'}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Email</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user?.us_email || 'No Email Available'}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Phone</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">0{user?.us_phone_number || 'No Phone Available'}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Address</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user?.us_address || 'No Address Available'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
