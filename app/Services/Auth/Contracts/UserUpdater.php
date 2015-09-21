<?php
/**
 * Created by PhpStorm.
 * User: antarus66
 * Date: 9/18/15
 * Time: 9:12 PM
 */
namespace App\Services\Auth\Contracts;

use App\Services\Auth\User;

abstract class UserUpdater
{
    /**
     * Updates a base user info from payload information
     *
     * @param $payload
     * @return User
     */
    abstract public function updateBaseInfo($payload);

    /**
     * Updates user info according to the new information from api
     *
     * @param $cookie
     * @param $user
     * @return User
     */
    abstract public function updateAdditionalInfo($cookie, $user);


    /**
     * Renames array $arr keys according to the $renamingMap
     *
     * @param array $arr
     * @param array $renamingMap
     */
    protected function renameArrayKeys(array &$arr, array $renamingMap)
    {
        foreach ($renamingMap as $old => $new) {
            if (array_key_exists($old, $arr)) {
                $arr[$new] = $arr[$old];
                unset($arr[$old]);
            }
        }
    }
}