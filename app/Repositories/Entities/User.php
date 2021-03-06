<?php

namespace App\Repositories\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Creativeorange\Gravatar\Facades\Gravatar;
use Creativeorange\Gravatar\Exceptions\InvalidEmailException;
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
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'avatar',
        'thumb_avatar',
        'country',
        'city',
        'gender',
        'birthday',
        'binary_id'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    protected $appends = ['result_role'];

    public function questions()
    {
        return $this->hasMany('App\Repositories\Entities\Question');
    }

    public function folder()
    {
        return $this->hasMany('App\Repositories\Entities\Folder');
    }

    public function globalRole()
    {
        return $this->belongsTo(
            'App\Repositories\Entities\RoleGlobal',
            'global_role_id',
            'id',
            'roles'
        );
    }

    public function localRole()
    {
        return $this->belongsTo(
            'App\Repositories\Entities\RoleLocal',
            'local_role_id',
            'id',
            'roles'
        );
    }

    public function getAvatarAttribute($avatar)
    {
        return $this->getAvatarPlaceholder($avatar);
    }

    public function getThumbAvatarAttribute($avatar)
    {
        return $this->getAvatarPlaceholder($avatar);
    }

    private function getAvatarPlaceholder($avatar)
    {
        if (empty($avatar)) {
            try {
                return Gravatar::get(
                    $this->attributes['email'],
                    [
                        'fallback' => 'identicon'
                    ]
                );
            } catch (InvalidEmailException $e) {
                return Gravatar::get(
                    'example@example.com',
                    [
                        'fallback' => 'identicon'
                    ]
                );
            }
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
        $role = $this->localRole;
        if ($role && $role->title !== 'USER') {
            return [$this->localRole->title];
        } else {
            $role = $this->globalRole;
            if ($role) {
                $local = $role->local;

                if ($local) {
                    return [$local->title];
                }
            }
        }

        return ['USER'];
    }

    public function getResultRoleAttribute()
    {
        return $this->getAssignments()[0];
    }
}
