<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Creativeorange\Gravatar\Facades\Gravatar;
use SmartCrowd\Rbac\Contracts\Assignable;
use SmartCrowd\Rbac\Traits\AllowedTrait;

class User extends Model implements Transformable, AuthenticatableContract, Assignable
{
    use TransformableTrait, Authenticatable, CanResetPassword, AllowedTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'avatar'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function questions()
    {
        return $this->hasMany('App\Repositories\Entities\Question');
    }

    public function folder()
    {
        return $this->hasMany('App\Repositories\Entities\Folder');
    }

    public function getAvatarAttribute($avatar)
    {
        if (empty($avatar)) {
            return Gravatar::get($this->attributes['email'], ['fallback' => 'identicon']);
        }

        return $avatar;
    }

    /**
     * Should return array of permissions and roles names,
     * assigned to user.
     *
     * @return array Array of user assignments.
     */
    public function getAssignments()
    {
        $role = $this->role;

        if ($role) {
            return [$role];
        } else {
            return ['USER'];
        }
    }
}
